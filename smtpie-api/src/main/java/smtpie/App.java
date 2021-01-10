package smtpie;

import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;
import smtpie.service.TenantService;

@Slf4j
@SpringBootApplication
public class App {
    public static void main(String[] args) {
        ApplicationContext context = SpringApplication.run(App.class, args);
        TenantService tenantService = context.getBean(TenantService.class);

        log.info("Loaded tenants:");
        tenantService.getAllIds().forEach(appId ->
                log.info("{}: {}", appId, tenantService.get(appId).get()));
    }
}
