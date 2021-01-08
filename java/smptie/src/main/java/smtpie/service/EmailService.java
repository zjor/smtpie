package smtpie.service;

import org.springframework.http.MediaType;
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

    public EmailService(TemplateRenderer templateRenderer, TemplateResolver templateResolver) {
        this.templateRenderer = templateRenderer;
        this.templateResolver = templateResolver;
    }

    public void send(
            Tenant tenant,
            String from,
            List<String> to,
            String subject,
            String template,
            String templateUrl,
            Map<String, Object> params) throws Exception {

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
        message.setFrom(new InternetAddress(from));

        Address[] recipients = new Address[to.size()];
        for (int i = 0; i < to.size(); i++) {
            recipients[i] = new InternetAddress(to.get(i));
        }

        message.setRecipients(Message.RecipientType.TO, recipients);
        message.setSubject(subject);

        MimeBodyPart mimeBodyPart = new MimeBodyPart();
        String messageBody = renderMessage(template, templateUrl, params);
        mimeBodyPart.setContent(messageBody, MediaType.TEXT_HTML_VALUE);

        Multipart multipart = new MimeMultipart();
        multipart.addBodyPart(mimeBodyPart);

        message.setContent(multipart);

        Transport.send(message);
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
        throw new RuntimeException("Either template or templateUrl should be populated");
    }

}
