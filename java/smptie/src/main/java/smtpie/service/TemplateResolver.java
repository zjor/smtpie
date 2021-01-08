package smtpie.service;

import lombok.extern.slf4j.Slf4j;
import org.apache.commons.io.IOUtils;

import java.io.InputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.HashMap;
import java.util.Map;

@Slf4j
public class TemplateResolver {

    private Map<String, String> templateCache = new HashMap<>();

    public String resolve(String url) {
        if (!templateCache.containsKey(url)) {
            templateCache.put(url, fetch(url));
        }
        return templateCache.get(url);
    }

    private String fetch(String url) {
        try {
            log.info("Fetching template from {}", url);
            HttpURLConnection connection = (HttpURLConnection) (new URL(url)).openConnection();
            InputStream in = connection.getInputStream();
            String encoding = connection.getContentEncoding();
            encoding = encoding == null ? "UTF-8" : encoding;
            return IOUtils.toString(in, encoding);
        } catch (Exception e) {
            log.error("Failed to fetch template: " + e.getMessage(), e);
            throw new RuntimeException(e);
        }
    }

}
