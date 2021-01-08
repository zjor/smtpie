package smtpie.service;

import javax.mail.*;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeBodyPart;
import javax.mail.internet.MimeMessage;
import javax.mail.internet.MimeMultipart;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Properties;

public class EmailService {

    public void send(
            Tenant tenant,
            String from,
            List<String> to,
            String subject,
            Optional<String> template,
            Optional<String> templateUrl,
            Optional<Map<String, Object>> params
    ) throws Exception {

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

        String msg = template.get();

        MimeBodyPart mimeBodyPart = new MimeBodyPart();
        mimeBodyPart.setContent(msg, "text/html");

        Multipart multipart = new MimeMultipart();
        multipart.addBodyPart(mimeBodyPart);

        message.setContent(multipart);

        Transport.send(message);
    }

}
