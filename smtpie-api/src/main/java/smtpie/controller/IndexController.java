package smtpie.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import smtpie.service.StatsService;

@Controller
public class IndexController {

    private final StatsService statsService;

    public IndexController(StatsService statsService) {
        this.statsService = statsService;
    }

    @GetMapping
    public ResponseEntity<String> index() {
        return ResponseEntity.ok("SMTPie API Server");
    }

    @GetMapping("stats")
    public ResponseEntity<Object> getStats() {
        return ResponseEntity.ok(statsService.getStats());
    }

}
