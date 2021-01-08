package smtpie.service;

import com.github.mustachejava.DefaultMustacheFactory;
import com.github.mustachejava.Mustache;
import com.github.mustachejava.MustacheFactory;
import lombok.extern.slf4j.Slf4j;

import java.io.StringReader;
import java.io.StringWriter;
import java.io.Writer;
import java.util.Map;

@Slf4j
public class TemplateRenderer {

    public String render(String template, Map<String, Object> params) {
        try {
            MustacheFactory mf = new DefaultMustacheFactory();
            Mustache mustache = mf.compile(new StringReader(template), "template");
            Writer writer = new StringWriter();
            mustache.execute(writer, params);
            writer.flush();
            return writer.toString();
        } catch (Exception e) {
            log.error("Failed to render template", e);
            throw new RuntimeException(e);
        }
    }

}
