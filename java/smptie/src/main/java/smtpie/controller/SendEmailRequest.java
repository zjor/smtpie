package smtpie.controller;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import java.util.List;
import java.util.Map;

@Data
public class SendEmailRequest {

    @JsonProperty("subject")
    private String subject;

    @JsonProperty("from")
    private String sender;

    @JsonProperty("to")
    private List<String> recipients;

    @JsonProperty("template")
    private String template;

    @JsonProperty("templateUrl")
    private String templateUrl;

    @JsonProperty("params")
    private Map<String, Object> params;

}
