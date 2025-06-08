package org.electrospinningdata.repository;

import org.electrospinningdata.model.Experiments;
import org.electrospinningdata.model.SolventProperties;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SolventPropertiesRepository extends JpaRepository<SolventProperties, Long> {
    SolventProperties findByExperiment(Experiments experiment);
}
