package smtpie.service;

public class EmailServiceException extends RuntimeException {
    public enum Code {
        NO_TEMPLATE_SPECIFIED,
        MAX_RECIPIENTS_QUOTA_EXCEEDED,
        MAX_HOURLY_EMAIL_QUOTA_EXCEEDED,
        EMAIL_SENDING_FAILED
    }

    public EmailServiceException(Code code) {
        super(code.name());
    }

    public EmailServiceException(Code code, Throwable cause) {
        super(code.name(), cause);
    }
}
