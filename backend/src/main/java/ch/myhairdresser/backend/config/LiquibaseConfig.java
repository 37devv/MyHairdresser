package ch.myhairdresser.backend.config;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import liquibase.integration.spring.SpringLiquibase;

@Configuration
public class LiquibaseConfig {

    @Value("${spring.liquibase.enabled:true}")
    private boolean enabled;

    @Value("${spring.liquibase.change-log:classpath:db/changelog/db.changelog-master.yaml}")
    private String changeLog;

    @Value("${spring.liquibase.contexts:}")
    private String contexts;

    @Value("${spring.liquibase.labels:}")
    private String labels;

    @Value("${spring.liquibase.default-schema:}")
    private String defaultSchema;

    @Value("${spring.liquibase.liquibase-schema:}")
    private String liquibaseSchema;

    @Value("${spring.liquibase.drop-first:false}")
    private boolean dropFirst;

    @Bean
    public SpringLiquibase liquibase(DataSource dataSource) {
        if (!enabled) {
            return new SpringLiquibase();
        }
        SpringLiquibase liquibase = new SpringLiquibase();
        liquibase.setDataSource(dataSource);
        liquibase.setChangeLog(changeLog);
        if (!contexts.isBlank()) {
            liquibase.setContexts(contexts);
        }
        if (!labels.isBlank()) {
            liquibase.setLabels(labels);
        }
        if (!defaultSchema.isBlank()) {
            liquibase.setDefaultSchema(defaultSchema);
        }
        if (!liquibaseSchema.isBlank()) {
            liquibase.setLiquibaseSchema(liquibaseSchema);
        }
        liquibase.setDropFirst(dropFirst);
        return liquibase;
    }
}
