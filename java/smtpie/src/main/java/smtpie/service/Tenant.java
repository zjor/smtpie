package smtpie.service;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
public class Tenant {
    private String appId;
    private String name;
    private String secret;
    private Connection connection;
    private Credentials credentials;
    private Limits limits = Limits.DEFAULT;

    @Data
    public static class Connection {
        private String host;
        private int port;
        private boolean ssl;
    }

    @Data
    public static class Credentials {
        private String username;
        private String password;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Limits {

        public static final Limits DEFAULT = new Limits(15, 1000);

        private int maxRecipients;
        private int maxHourly;
    }

    @Data
    public static class Tenants {
        private List<Tenant> tenants;
    }
}
