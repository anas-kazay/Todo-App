package kazay.anas.rest.webservices.backend.basic;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import static org.springframework.security.config.Customizer.withDefaults;


@Configuration
public class BasicAuthenticationSecurityConfiguration {
     @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

         http.authorizeHttpRequests(
                 auth->auth.
                         requestMatchers(HttpMethod.OPTIONS,"/**").permitAll().
                         anyRequest().authenticated()
         ) .headers(headers -> headers.frameOptions(withDefaults()).disable());

         http.httpBasic(withDefaults());
         http.sessionManagement(session-> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS));
         http.csrf(AbstractHttpConfigurer::disable);
         return http.build();
     }

     @Bean
    public WebMvcConfigurer corsConfigurer(){
         return new WebMvcConfigurer() {
             @Override
             public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**").allowedMethods("*")
                        .allowedOrigins("http://localhost:3000");
             }
         };
     }

     @Bean
    public UserDetailsService userDetailsService(){

         var user = User.withUsername("anas").password("{noop}kazay")
                 .roles("USER")
                 .build();
         var admin = User.withUsername("admin").password("{noop}kazay")
                 .roles("ADMIN")
                 .build();

         return new InMemoryUserDetailsManager(user,admin);

     }

}
