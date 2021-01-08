package smtpie.controller;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@Data
public class SendEmailRequest {

    @JsonProperty("subject")
    private String subject;

    @JsonProperty("from")
    private String sender;

    @JsonProperty("to")
    private List<String> recipients;

    @JsonProperty("template")
    private Optional<String> template;

    @JsonProperty("templateUrl")
    private Optional<String> templateUrl;

    @JsonProperty("params")
    private Optional<Map<String, Object>> params;

}
