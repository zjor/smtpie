package smtpie.service;

import lombok.Data;

import java.util.List;

@Data
public class Tenant {
    private String appId;
    private String name;
    private String secret;
    private Connection connection;
    private Credentials credentials;

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
    public static class Tenants {
        private List<Tenant> tenants;
    }
}
