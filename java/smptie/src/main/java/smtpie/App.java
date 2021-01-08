package smtpie;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;
import smtpie.service.Tenant;
import smtpie.service.TenantService;

import java.util.Optional;

@SpringBootApplication
public class App {
    public static void main(String[] args) {
        ApplicationContext context = SpringApplication.run(App.class, args);

        TenantService tenantService = context.getBean(TenantService.class);

        Optional<Tenant> tenant = tenantService.get("jho7qh");
        System.out.println(tenant);
    }
}
