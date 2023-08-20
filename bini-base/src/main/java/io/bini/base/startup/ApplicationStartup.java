package io.bini.base.startup;

import io.bini.base.user.ApplicationUserDTO;
import io.bini.base.user.ApplicationUserService;
import io.bini.base.user.role.RoleDTO;
import io.bini.base.user.role.RoleService;
import lombok.extern.log4j.Log4j2;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.event.EventListener;

import java.util.Collections;
import java.util.Optional;

@Configuration
@Log4j2
public class ApplicationStartup {

    private final ApplicationUserService userService;

    private final RoleService roleService;

    public ApplicationStartup(ApplicationUserService userService, RoleService roleService) {
        this.userService = userService;
        this.roleService = roleService;
    }

    @EventListener(ApplicationReadyEvent.class)
    public void doSomethingAfterStartup() {
        log.info("Application started, checking basic roles and users");
        Optional<RoleDTO> maybeAdminRole = roleService.getAdminRole();
        if (maybeAdminRole.isEmpty()) {
            log.info("No admin role in DB, creating it");
            RoleDTO adminRole = new RoleDTO();
            adminRole.setCode("ADMIN");
            adminRole = roleService.save(adminRole);
            maybeAdminRole = Optional.of(adminRole);
        }

        Optional<RoleDTO> maybeUserRole = roleService.getUserRole();
        if (maybeUserRole.isEmpty()) {
            log.info("No user role in DB, creating it");
            RoleDTO userRole = new RoleDTO();
            userRole.setCode("USER");
            userRole = roleService.save(userRole);
            maybeUserRole = Optional.of(userRole);
        }

        long userCount = userService.count();
        log.debug("Number of user(s) in db: {}", userCount);
        if (userCount == 0) {
            log.info("No user in DB, creating default admin and default user");
            ApplicationUserDTO defaultAdmin = new ApplicationUserDTO();
            defaultAdmin.setEmail("admin@bini.io");
            defaultAdmin.setUsername("admin");
            defaultAdmin.setPassword("{noop}password");
            defaultAdmin.setRoles(Collections.singleton(maybeAdminRole.get()));
            userService.save(defaultAdmin);

            ApplicationUserDTO defaultUser = new ApplicationUserDTO();
            defaultUser.setEmail("user@bini.io");
            defaultUser.setUsername("user");
            defaultUser.setPassword("{noop}password");
            defaultUser.setRoles(Collections.singleton(maybeUserRole.get()));
            userService.save(defaultUser);
        }
    }
}
