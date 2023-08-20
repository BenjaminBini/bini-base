package io.bini.base.security;

import io.bini.base.user.ApplicationUser;
import io.bini.base.user.ApplicationUserService;
import io.bini.base.user.role.Role;
import lombok.Getter;
import lombok.Setter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class CustomUserDetailService implements UserDetailsService {

    private final ApplicationUserService applicationUserService;

    public CustomUserDetailService(ApplicationUserService applicationUserService) {
        this.applicationUserService = applicationUserService;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<ApplicationUser> maybeApplicationUser = applicationUserService.findByUsername(username);
        return maybeApplicationUser
                .map(CustomUserDetails::new)
                .orElseThrow(() -> new UsernameNotFoundException("username " + username + " is not found"));
    }

    @Getter
    @Setter
    static final class CustomUserDetails implements UserDetails {

        CustomUserDetails(ApplicationUser applicationUser) {
            this.setId(applicationUser.getId());
            this.setUsername(applicationUser.getUsername());
            this.setEmail(applicationUser.getEmail());
            this.setPassword(applicationUser.getPassword());
            this.setEnabled(true);
            this.setAccountNonExpired(true);
            this.setAccountNonLocked(true);
            this.setCredentialsNonExpired(true);
            this.setAuthorities(
                    AuthorityUtils.commaSeparatedStringToAuthorityList(
                            applicationUser.getRoles().stream()
                                    .map(Role::getCode)
                                    .collect(Collectors.joining(","))
                    )
            );
        }

        private Collection<? extends GrantedAuthority> authorities;

        private Long id;

        private String password;

        private String username;

        private String email;

        private boolean accountNonExpired;

        private boolean accountNonLocked;

        public boolean credentialsNonExpired;

        public boolean enabled;

    }
}
