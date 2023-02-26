package io.bini.base.user;

import io.bini.base.mapper.GenericMapperService;
import io.bini.base.service.BaseService;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ApplicationUserService extends BaseService<ApplicationUser, ApplicationUserDTO, Long> {
    private final ApplicationUserRepository applicationUserRepository;

    public ApplicationUserService(ApplicationUserRepository repository, GenericMapperService mapperService) {
        super(repository, mapperService);
        this.applicationUserRepository = repository;
    }

    public Optional<ApplicationUser> findByUsername(String username) {
        return this.applicationUserRepository.findApplicationUserByUsernameIgnoreCase(username);
    }
}
