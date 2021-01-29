package smtpie.service;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

public class StatsService {

    @Getter
    private Map<String, Stats> stats = new ConcurrentHashMap<>();

    public void incSuccess(String appId) {
        if (!stats.containsKey(appId)) {
            stats.put(appId, Stats.ZERO);
        }
        stats.put(appId, stats.get(appId).incSuccesses());
    }

    public void incFailure(String appId) {
        if (!stats.containsKey(appId)) {
            stats.put(appId, Stats.ZERO);
        }
        stats.put(appId, stats.get(appId).incFailures());
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Stats {

        public static final Stats ZERO = new Stats(0, 0);

        private long successes;
        private long failures;

        public Stats incSuccesses() {
            return new Stats(successes + 1, failures);
        }

        public Stats incFailures() {
            return new Stats(successes, failures + 1);
        }
    }

}
