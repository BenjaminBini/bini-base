package io.bini.base.user.role;

import io.bini.base.mapper.GenericMapperService;
import io.bini.base.service.BaseService;
import org.springframework.stereotype.Service;

@Service
public class RoleService extends BaseService<Role, RoleDTO, Long> {

    public RoleService(RoleRepository repository, GenericMapperService mapperService) {
        super(repository, mapperService);
    }

}
