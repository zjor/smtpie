package smtpie.service;


import org.junit.Assert;
import org.junit.Test;

import java.util.Collections;

public class TemplateRendererTest {

    @Test
    public void shouldRenderCyrillic() {
        TemplateRenderer renderer = new TemplateRenderer();
        String template = "Привет, {{name}}";

        String result = renderer.render(template, Collections.singletonMap("name", "Алиса"));
        Assert.assertEquals("Привет, Алиса", result);
    }
}