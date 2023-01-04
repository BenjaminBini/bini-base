package io.bini.base.user;

import io.bini.base.persistence.BaseRepository;

import java.util.Optional;

public interface ApplicationUserRepository extends BaseRepository<ApplicationUser, Long> {

    Optional<ApplicationUser> findApplicationUserByUsernameIgnoreCase(String username);
}
