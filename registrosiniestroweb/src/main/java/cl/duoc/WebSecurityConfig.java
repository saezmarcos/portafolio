package cl.duoc;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

/**
 * Created by Usuario on 24-05-2017.
 */
@Configuration
@EnableWebSecurity
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {
    @Autowired
    private UserDetailsService userDetailsService;

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                .authorizeRequests()
                .antMatchers("/").permitAll()
                .antMatchers("/login").permitAll()
                .antMatchers("/analista/**").hasAnyAuthority("Analista de Negocio")
                .antMatchers("/callcenter/**").hasAnyAuthority("CallCenter")
                .antMatchers("/cliente/**").hasAnyAuthority("Cliente")
                .antMatchers("/administrador/**").hasAnyAuthority("Administrador")
                .antMatchers("/chofergrua/**").hasAnyAuthority("Chofer Grua")
                .antMatchers("/administradortaller/**").hasAnyAuthority("Administrador Taller")
                .antMatchers("/siniestrador/**").hasAnyAuthority("Siniestrador")
                .antMatchers("/liquidador/**").hasAnyAuthority("Liquidador")
                .antMatchers("/sistema/**").hasAnyAuthority("Sistema")
                //.anyRequest().authenticated()
                .and().csrf().disable()
                .formLogin()
                .loginPage("/login").failureUrl("/acceso/usuario/login/")
                .defaultSuccessUrl("/acceso/usuario/login/")
                .usernameParameter("rut")
                .passwordParameter("password")
                .permitAll()
                .and()
                .logout()
                .logoutRequestMatcher(new AntPathRequestMatcher("/logout"))
                .logoutSuccessUrl("/login")
                .permitAll();

    }


}
