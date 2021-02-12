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

        /*
        // Encoding debug
        TemplateResolver resolver = context.getBean(TemplateResolver.class);
        TemplateRenderer renderer = context.getBean(TemplateRenderer.class);

        String url = "https://gitlab.com/shared-living/resources/-/raw/master/templates/match.html";
        String template = resolver.resolve(url);
        log.info("Resolved: {}", template);

        String rendered = renderer.render(template, Collections.emptyMap());
        log.info("Rendered: {}", template);

         */
    }
}
