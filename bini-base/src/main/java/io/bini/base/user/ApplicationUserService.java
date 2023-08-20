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

    public Optional<ApplicationUser> save(ApplicationUserWithPasswordDTO dto) {
        ApplicationUser applicationUser = mapperService.getMapper(ApplicationUser.class, ApplicationUserWithPasswordDTO.class).toModel(dto);

        // If we are in an "update" case, we don't want to change the password if it is not provided
        if (dto.getId() != null && (dto.getPassword() == null || dto.getPassword().isEmpty())) {
            Optional<ApplicationUser> existingUser = this.applicationUserRepository.findById(dto.getId());
            existingUser.ifPresent(user -> applicationUser.setPassword(user.getPassword()));
        }
        return Optional.of(this.applicationUserRepository.save(applicationUser));
    }

}
