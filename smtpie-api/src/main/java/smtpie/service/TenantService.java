package smtpie.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.dataformat.yaml.YAMLFactory;

import java.io.IOException;
import java.io.InputStream;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import java.util.Set;

public class TenantService {

    private Map<String, Tenant> tenantIndex = new HashMap<>();

    public void load(InputStream in) throws IOException {
        ObjectMapper mapper = new ObjectMapper(new YAMLFactory());
        Tenant.Tenants yaml = mapper.readValue(in, Tenant.Tenants.class);
        yaml.getTenants().forEach(t -> tenantIndex.put(t.getAppId(), t));
    }

    public Optional<Tenant> get(String appId) {
        return Optional.ofNullable(tenantIndex.get(appId));
    }

    public Set<String> getAllIds() {
        return tenantIndex.keySet();
    }
}
