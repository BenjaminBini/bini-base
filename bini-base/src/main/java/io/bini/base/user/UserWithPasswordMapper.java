package io.bini.base.user;

import io.bini.base.mapper.GenericMapper;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface UserWithPasswordMapper extends GenericMapper<ApplicationUser, ApplicationUserWithPasswordDTO> {
}
