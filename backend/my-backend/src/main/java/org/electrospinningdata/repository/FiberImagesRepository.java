package org.electrospinningdata.repository;

import org.electrospinningdata.model.Experiments;
import org.electrospinningdata.model.FiberImages;
import org.electrospinningdata.model.NeedleProperties;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FiberImagesRepository extends JpaRepository<FiberImages, Long> {
    List<FiberImages> findByExperiment(Experiments experiment);

}
