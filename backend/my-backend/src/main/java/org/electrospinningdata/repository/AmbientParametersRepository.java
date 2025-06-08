package org.electrospinningdata.repository;

import org.electrospinningdata.model.AmbientParameters;
import org.electrospinningdata.model.Experiments;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AmbientParametersRepository extends JpaRepository<AmbientParameters, Long> {
    AmbientParameters findByExperiments(Experiments experiment);
}
