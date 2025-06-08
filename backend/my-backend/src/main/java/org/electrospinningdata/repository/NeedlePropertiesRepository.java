package org.electrospinningdata.repository;

import org.electrospinningdata.model.Experiments;
import org.electrospinningdata.model.NeedleProperties;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NeedlePropertiesRepository extends JpaRepository<NeedleProperties, Long> {
    // Find needle properties (including components) by experiment

    // Find needle properties by needlePropertyId (previously for components)
    List<NeedleProperties> findByNeedlePropertyId(Long needlePropertyId);

    NeedleProperties findByExperiment(Experiments experiment);
}
