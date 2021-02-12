package smtpie.service;

import org.junit.Ignore;
import org.junit.Test;

@Ignore("manual test")
public class TemplateResolverTest {

    @Test
    public void shouldResolveWithCyrillic() {
        String url = "https://gitlab.com/shared-living/resources/-/raw/master/templates/match.html";
        TemplateResolver resolver = new TemplateResolver();
        String template = resolver.resolve(url);
        System.out.println(template);
    }

}