package smtpie.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import smtpie.service.*;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;

@Configuration
public class ServiceConfiguration {

    @Value("${tenants.config_file}")
    private String tenantsConfigFile;

    @Bean
    public TenantService tenantService() {
        try {
            TenantService tenantService = new TenantService();
            tenantService.load(new FileInputStream(new File(tenantsConfigFile)));
            return tenantService;
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    @Bean
    public TemplateRenderer templateRenderer() {
        return new TemplateRenderer();
    }

    @Bean
    public TemplateResolver templateResolver() {
        return new TemplateResolver();
    }

    @Bean
    public EmailService emailService(
            @Autowired TemplateRenderer templateRenderer,
            @Autowired TemplateResolver templateResolver,
            @Autowired StatsService statsService) {
        return new EmailService(templateRenderer, templateResolver, statsService);
    }

    @Bean
    public StatsService statsService() {
        return new StatsService();
    }
}
