package smtpie.service;

import java.util.LinkedList;

public class FrequencyLimitService {

    private final long periodMillis;
    private final int quota;

    private LinkedList<Long> eventsLog = new LinkedList<>();

    public FrequencyLimitService(long periodMillis, int quota) {
        this.periodMillis = periodMillis;
        this.quota = quota;
    }

    public boolean allowEvent(long now) {
        Long head;
        while ((head = eventsLog.peek()) != null && now - head > periodMillis) {
            eventsLog.poll();
        }
        if (eventsLog.size() < quota) {
            eventsLog.offer(now);
            return true;
        } else {
            return false;
        }
    }

}
