package org.electrospinningdata.repository;

import org.electrospinningdata.model.ResearchMetadata;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ResearchMetadataRepository extends JpaRepository<ResearchMetadata, Long> {
    Optional<ResearchMetadata> findByDoiOrPublicationTitle(String doi, String publicationTitle);

}
