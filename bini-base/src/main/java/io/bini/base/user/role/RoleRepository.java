package io.bini.base.user.role;

import io.bini.base.persistence.BaseRepository;

import java.util.Optional;

public interface RoleRepository extends BaseRepository<Role, Long> {

    Optional<Role> findRoleByName(String name);
}
