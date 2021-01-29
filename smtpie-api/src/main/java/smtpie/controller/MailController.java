package smtpie.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import smtpie.aop.Log;
import smtpie.controller.dto.SendEmailRequest;
import smtpie.controller.dto.SendEmailResponse;
import smtpie.service.EmailService;
import smtpie.service.StatsService;
import smtpie.service.Tenant;
import smtpie.service.TenantService;

@RestController
@RequestMapping("api/v1/mail")
public class MailController {

    private final TenantService tenantService;
    private final EmailService emailService;
    private final StatsService statsService;

    @Autowired
    public MailController(
            TenantService tenantService,
            EmailService emailService,
            StatsService statsService) {
        this.tenantService = tenantService;
        this.emailService = emailService;
        this.statsService = statsService;
    }

    @Log
    @PostMapping("send")
    public SendEmailResponse send(
            @RequestHeader("X-App-ID") String appId,
            @RequestHeader("X-Secret") String secret,
            @RequestBody SendEmailRequest req) {

        Tenant tenant = tenantService.get(appId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "TENANT_NOT_FOUND"));

        if (!tenant.getSecret().equals(secret)) {
            statsService.incFailure(appId);
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "BAD_SECRET");
        }

        emailService.send(tenant,
                req.getSender(),
                req.getRecipients(),
                req.getSubject(),
                req.getTemplate(),
                req.getTemplateUrl(),
                req.getParams());

        return new SendEmailResponse(true);
    }

}
