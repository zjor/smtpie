package smtpie.service;

import org.junit.Assert;
import org.junit.Test;

public class FrequencyLimitServiceTest {

    @Test
    public void shouldAllowEvent() {
        FrequencyLimitService service = new FrequencyLimitService(10, 3);
        Assert.assertTrue(service.allowEvent(3));
        Assert.assertTrue(service.allowEvent(5));
        Assert.assertTrue(service.allowEvent(7));
        Assert.assertFalse(service.allowEvent(8));
        Assert.assertTrue(service.allowEvent(14));
    }

}