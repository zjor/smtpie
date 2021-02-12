package smtpie.service;

import org.springframework.util.StringUtils;

import javax.mail.*;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeBodyPart;
import javax.mail.internet.MimeMessage;
import javax.mail.internet.MimeMultipart;
import java.util.*;

public class EmailService {

    private final TemplateRenderer templateRenderer;
    private final TemplateResolver templateResolver;
    private final StatsService statsService;

    private final Map<String, FrequencyLimitService> quotas = new HashMap<>();

    public EmailService(TemplateRenderer templateRenderer, TemplateResolver templateResolver, StatsService statsService) {
        this.templateRenderer = templateRenderer;
        this.templateResolver = templateResolver;
        this.statsService = statsService;
    }

    public void send(
            Tenant tenant,
            String from,
            List<String> to,
            String subject,
            String template,
            String templateUrl,
            Map<String, Object> params) {

        if (to.size() > tenant.getLimits().getMaxRecipients()) {
            statsService.incFailure(tenant.getAppId());
            throw new EmailServiceException(EmailServiceException.Code.MAX_RECIPIENTS_QUOTA_EXCEEDED);
        }

        checkFrequencyQuotaOrThrow(tenant);

        String port = String.valueOf(tenant.getConnection().getPort());

        Properties props = new Properties();
        props.put("mail.smtp.host", tenant.getConnection().getHost());
        props.put("mail.smtp.port", port);
        props.put("mail.smtp.auth", "true");
        props.put("mail.smtp.socketFactory.port", port);
        props.put("mail.smtp.socketFactory.class", "javax.net.ssl.SSLSocketFactory");
        props.put("mail.debug", "true");

        Session session = Session.getDefaultInstance(props,
                new javax.mail.Authenticator() {
                    @Override
                    protected PasswordAuthentication getPasswordAuthentication() {
                        return new PasswordAuthentication(
                                tenant.getCredentials().getUsername(),
                                tenant.getCredentials().getPassword());
                    }
                });

        Message message = new MimeMessage(session);
        try {
            message.setFrom(new InternetAddress(from));

            Address[] recipients = new Address[to.size()];
            for (int i = 0; i < to.size(); i++) {
                recipients[i] = new InternetAddress(to.get(i));
            }

            message.setRecipients(Message.RecipientType.TO, recipients);
            message.setSubject(subject);

            MimeBodyPart mimeBodyPart = new MimeBodyPart();
            String messageBody = renderMessage(template, templateUrl, params);
            mimeBodyPart.setContent(messageBody, "text/html;charset=UTF-8");

            Multipart multipart = new MimeMultipart();
            multipart.addBodyPart(mimeBodyPart);

            message.setContent(multipart);

            Transport.send(message);
            statsService.incSuccess(tenant.getAppId());
        } catch (Exception e) {
            statsService.incFailure(tenant.getAppId());
            throw new EmailServiceException(EmailServiceException.Code.EMAIL_SENDING_FAILED, e);
        }
    }

    private String renderMessage(
            String template,
            String templateUrl,
            Map<String, Object> params
    ) {
        params = params != null ? params : Collections.emptyMap();
        if (!StringUtils.isEmpty(template)) {
            return templateRenderer.render(template, params);
        }

        if (!StringUtils.isEmpty(templateUrl)) {
            String templateContent = templateResolver.resolve(templateUrl);
            return templateRenderer.render(templateContent, params);
        }
        throw new EmailServiceException(EmailServiceException.Code.NO_TEMPLATE_SPECIFIED);
    }

    private void checkFrequencyQuotaOrThrow(Tenant tenant) {
        String appId = tenant.getAppId();
        if (!quotas.containsKey(appId)) {
            quotas.put(appId,
                    new FrequencyLimitService(3600 * 1000L, tenant.getLimits().getMaxHourly()));
        }
        if (!quotas.get(appId).allowEvent(System.currentTimeMillis())) {
            throw new EmailServiceException(EmailServiceException.Code.MAX_HOURLY_EMAIL_QUOTA_EXCEEDED);
        }
    }

}
