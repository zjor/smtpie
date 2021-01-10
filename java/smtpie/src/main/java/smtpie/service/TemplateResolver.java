package smtpie.service;

import lombok.extern.slf4j.Slf4j;
import org.apache.commons.io.IOUtils;
import org.apache.http.HttpResponse;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.util.EntityUtils;

import java.io.InputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.HashMap;
import java.util.Map;

@Slf4j
public class TemplateResolver {

    private Map<String, String> templateCache = new HashMap<>();

    private HttpClient httpClient = HttpClients.createDefault();

    public String resolve(String url) {
        if (!templateCache.containsKey(url)) {
            templateCache.put(url, fetch(url));
        }
        return templateCache.get(url);
    }

    private String fetch(String url) {
        try {
            log.info("Fetching template from {}", url);
            HttpResponse res = httpClient.execute(new HttpGet(url));
            if (res.getStatusLine().getStatusCode() == HttpURLConnection.HTTP_OK) {
                return EntityUtils.toString(res.getEntity());
            } else {
                throw new RuntimeException(res.getStatusLine().toString());
            }
        } catch (Exception e) {
            log.error("Failed to fetch template: " + e.getMessage(), e);
            throw new RuntimeException(e);
        }
    }

}
