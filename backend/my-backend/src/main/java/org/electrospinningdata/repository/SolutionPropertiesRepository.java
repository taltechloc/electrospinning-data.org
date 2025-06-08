package org.electrospinningdata.repository;

import org.electrospinningdata.model.Experiments;
import org.electrospinningdata.model.SolutionProperties;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SolutionPropertiesRepository extends JpaRepository<SolutionProperties, Long> {
    SolutionProperties findByExperiment(Experiments experiment);
}
