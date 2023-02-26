package io.bini.base.user.role;

import io.bini.base.mapper.GenericMapperService;
import io.bini.base.service.BaseService;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class RoleService extends BaseService<Role, RoleDTO, Long> {

    private final RoleRepository roleRepository;

    public RoleService(RoleRepository repository, GenericMapperService mapperService) {
        super(repository, mapperService);
        this.roleRepository = repository;
    }

    public Optional<RoleDTO> getAdminRole() {
        Optional<Role> maybeAdmin = this.roleRepository.findRoleByName("ADMIN");
        return maybeAdmin.map(this.mapper::toDto);
    }

    public Optional<RoleDTO> getUserRole() {
        Optional<Role> maybeUser = this.roleRepository.findRoleByName("USER");
        return maybeUser.map(this.mapper::toDto);
    }

}
