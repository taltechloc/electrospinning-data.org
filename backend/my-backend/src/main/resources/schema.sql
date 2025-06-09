--DROP TABLE IF EXISTS
--    ambient_parameters,
--    approved_data,
--    contributors,
--    data_file,
--    data_submission,
--    experiments,
--    fiber_properties,
--    moderation_logs,
--    needle_components,
--    needle_properties,
--    polymer_components,
--    polymer_properties,
--    process_parameter,
--    single_needle_contributed,
--    single_needle_dataset,
--    single_needle_rejected,
--    solution_properties,
--    solvent_components,
--    solvent_properties,
--    unit,
--    collector_properties,
--    polymer,
--    solvent,
--    fiber_morphology,
--    morphology,
--    users,
--    fiber_images,
--    user_info;


CREATE TABLE IF NOT EXISTS feedback (
    feedback_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    email VARCHAR(255),
    category VARCHAR(255),
    subject VARCHAR(255) NOT NULL,
    message TEXT,
    image_data LONGBLOB
);


CREATE TABLE IF NOT EXISTS users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    role VARCHAR(100),
    affiliation VARCHAR(255),
    research_lab VARCHAR(255),
    orcid VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);



CREATE TABLE IF NOT EXISTS user_info (
    user_id CHAR(36) NOT NULL PRIMARY KEY,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    affiliation VARCHAR(255),
    lab VARCHAR(255),
    country VARCHAR(255),
    role VARCHAR(255),
    orcid VARCHAR(255),
    doi VARCHAR(255),
    device_manufacturer VARCHAR(255),
    device_model VARCHAR(255),
    custom_device BOOLEAN,
    show_publicly BOOLEAN DEFAULT FALSE,
    consent_terms BOOLEAN DEFAULT FALSE
);

CREATE TABLE IF NOT EXISTS experiments (
    experiment_id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    submission_id BIGINT UNSIGNED, -- Optional during insert
    user_id CHAR(36) NOT NULL,
    status ENUM('PENDING', 'APPROVED', 'REJECTED') NOT NULL DEFAULT 'PENDING',

    FOREIGN KEY (user_id) REFERENCES user_info(user_id)
);

CREATE TABLE IF NOT EXISTS data_submission (
    submission_id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    user_id CHAR(36) NOT NULL,
    submission_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (user_id) REFERENCES user_info(user_id)
);

CREATE TABLE IF NOT EXISTS unit (
    unit_id INT PRIMARY KEY AUTO_INCREMENT,
    unit_name VARCHAR(50),
    unit VARCHAR(50) UNIQUE NOT NULL
);

CREATE TABLE IF NOT EXISTS process_parameter (
    process_parameter_id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    experiment_id BIGINT UNSIGNED NOT NULL,

    voltage DECIMAL(10, 2),
    voltage_unit_id INT,  -- References the unit in the units table

    flow_rate DECIMAL(10, 2),
    flow_rate_unit_id INT,  -- References the unit in the units table

    tip_collector_distance DECIMAL(10, 2),
    tip_collector_distance_unit_id INT,

    spinning_duration DECIMAL(10, 2),
    spinning_duration_unit_id INT,
    FOREIGN KEY (experiment_id) REFERENCES experiments(experiment_id),
    FOREIGN KEY (voltage_unit_id) REFERENCES unit(unit_id),
    FOREIGN KEY (flow_rate_unit_id) REFERENCES unit(unit_id),
    FOREIGN KEY (tip_collector_distance_unit_id) REFERENCES unit(unit_id),
    FOREIGN KEY (spinning_duration_unit_id) REFERENCES unit(unit_id)
);



CREATE TABLE IF NOT EXISTS needle_properties (
    needle_property_id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    experiment_id BIGINT UNSIGNED NOT NULL,
    needle_type VARCHAR(50), -- e.g., 'single', 'coaxial', 'triaxial'
    needle_definition JSON,
    FOREIGN KEY (experiment_id) REFERENCES experiments(experiment_id)
);



CREATE TABLE IF NOT EXISTS ambient_parameters (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    experiment_id BIGINT UNSIGNED NOT NULL,
    temperature DECIMAL(5, 2),
    temperature_unit_id INT,
    humidity DECIMAL(5, 2),
    humidity_unit_id INT,
    FOREIGN KEY (experiment_id) REFERENCES experiments(experiment_id),
    FOREIGN KEY (temperature_unit_id) REFERENCES unit(unit_id),
    FOREIGN KEY (humidity_unit_id) REFERENCES unit(unit_id)
);

CREATE TABLE IF NOT EXISTS polymer (
    polymer_id INT PRIMARY KEY AUTO_INCREMENT,
    polymer_name VARCHAR(100) UNIQUE NOT NULL,
    full_name VARCHAR(255),
    cas_number VARCHAR(50),
    abbreviation VARCHAR(50)
);

CREATE TABLE IF NOT EXISTS polymer_properties (
    polymer_property_id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    experiment_id BIGINT UNSIGNED NOT NULL,
    FOREIGN KEY (experiment_id) REFERENCES experiments(experiment_id)
);



CREATE TABLE IF NOT EXISTS polymer_components (
    component_id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    polymer_property_id BIGINT UNSIGNED NOT NULL,
    polymer_id INT NOT NULL,
    polymer_weight DOUBLE,
    weight_ratio DOUBLE,
    weight_ratio_unit_id INT,
    polymer_weight_unit_id INT,
    molecular_weight DOUBLE,
    molecular_weight_unit_id INT,
    FOREIGN KEY (polymer_property_id) REFERENCES polymer_properties(polymer_property_id),
    FOREIGN KEY (polymer_id) REFERENCES polymer(polymer_id),
    FOREIGN KEY (polymer_weight_unit_id) REFERENCES unit(unit_id),
    FOREIGN KEY (weight_ratio_unit_id) REFERENCES unit(unit_id),
    FOREIGN KEY (molecular_weight_unit_id) REFERENCES unit(unit_id)
);

CREATE TABLE IF NOT EXISTS solvent (
    solvent_id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    solvent_name VARCHAR(100) NOT NULL UNIQUE,
    full_name VARCHAR(255),
    cas_number VARCHAR(50),
    abbreviation VARCHAR(50)
);


CREATE TABLE IF NOT EXISTS solvent_properties (
    solvent_property_id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    experiment_id BIGINT UNSIGNED NOT NULL,
    FOREIGN KEY (experiment_id) REFERENCES experiments(experiment_id)
);


CREATE TABLE IF NOT EXISTS solvent_components (
  component_id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  solvent_property_id BIGINT UNSIGNED NOT NULL,
  solvent_id BIGINT UNSIGNED NOT NULL,
  weight DECIMAL(5,2),
  weight_unit_id INT,
  volume_ratio DOUBLE,
  volume_ratio_unit_id INT,
  FOREIGN KEY (solvent_property_id) REFERENCES solvent_properties(solvent_property_id),
  FOREIGN KEY (weight_unit_id) REFERENCES unit(unit_id),
  FOREIGN KEY (volume_ratio_unit_id) REFERENCES unit(unit_id),
  FOREIGN KEY (solvent_id) REFERENCES solvent(solvent_id)
);


CREATE TABLE IF NOT EXISTS solution_properties (
    solution_property_id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    experiment_id BIGINT UNSIGNED NOT NULL,
    concentration DECIMAL(5,2),
    concentration_unit_id INT,
    viscosity DECIMAL(10,2),
    viscosity_unit_id INT,
    surface_tension DECIMAL(10,2),
    surface_tension_unit_id INT,
    conductivity DECIMAL(10,2),
    conductivity_unit_id INT,
    evaporation_rate DECIMAL(10,2),
    evaporation_rate_unit_id INT,
    pH DECIMAL(4,2),
    FOREIGN KEY (experiment_id) REFERENCES experiments(experiment_id),
    FOREIGN KEY (concentration_unit_id) REFERENCES unit(unit_id),
    FOREIGN KEY (viscosity_unit_id) REFERENCES unit(unit_id),
    FOREIGN KEY (surface_tension_unit_id) REFERENCES unit(unit_id),
    FOREIGN KEY (conductivity_unit_id) REFERENCES unit(unit_id),
    FOREIGN KEY (evaporation_rate_unit_id) REFERENCES unit(unit_id)
);


CREATE TABLE IF NOT EXISTS collector_properties (
    collector_id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    experiment_id BIGINT UNSIGNED NOT NULL,
    collector_type VARCHAR(100),
    collector_definition JSON,
    FOREIGN KEY (experiment_id) REFERENCES experiments(experiment_id)
);

CREATE TABLE IF NOT EXISTS fiber_properties (
    fiber_property_id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    experiment_id BIGINT UNSIGNED NOT NULL,
    is_formation_stable BOOLEAN,
    fiber_diameter DECIMAL(10,2),
    fiber_diameter_unit_id INT,
    fiber_diameter_variation DECIMAL(10,2),
    fiber_diameter_variation_unit_id INT,
    product_weight DECIMAL(10,2),
    product_weight_unit_id INT,
    quality_grade DOUBLE,

    FOREIGN KEY (experiment_id) REFERENCES experiments(experiment_id),
    FOREIGN KEY (fiber_diameter_unit_id) REFERENCES unit(unit_id),
    FOREIGN KEY (fiber_diameter_variation_unit_id) REFERENCES unit(unit_id),
    FOREIGN KEY ( product_weight_unit_id) REFERENCES unit(unit_id)

);


CREATE TABLE IF NOT EXISTS fiber_images (
    fiber_images_id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    experiment_id BIGINT UNSIGNED NOT NULL,
    image_type VARCHAR(100),
    image_definition JSON,
    image_data LONGBLOB,

    FOREIGN KEY (experiment_id) REFERENCES experiments(experiment_id)
);

CREATE TABLE IF NOT EXISTS morphology (
    morphology_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    category ENUM(
        'Structure',
        'Topography',
        'Texture',
        'Shape',
        'Composition',
        'Defects'
    ) NOT NULL,
    label VARCHAR(100) UNIQUE NOT NULL,
    abbreviation VARCHAR(50)
);

CREATE TABLE IF NOT EXISTS fiber_morphology (
    fiber_morphology_id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    fiber_property_id BIGINT UNSIGNED NOT NULL,
    morphology_id INT NOT NULL,
    FOREIGN KEY (fiber_property_id) REFERENCES fiber_properties(fiber_property_id),
    FOREIGN KEY (morphology_id) REFERENCES morphology(morphology_id)
);


INSERT INTO unit (unit_name, unit) VALUES
('kilovolt', 'kV'),
('volt', 'V'),
('milliliter per hour', 'mL/h'),
('microliter per minute', 'µL/min'),
('millimeter', 'mm'),
('centimeter', 'cm'),
('second', 's'),
('minute', 'min'),
('hour', 'h'),
('micrometer', 'µm'),
('nanometer', 'nm'),
('degree Celsius', '°C'),
('kelvin', 'K'),
('relative humidity', '% RH'),
('weight percent', 'wt%'),
('percent', '%'),
('milligram per milliliter', 'mg/mL'),
('gram per liter', 'g/L'),
('gram per mole', 'g/mol'),
('kilodalton', 'kDa'),
('centipoise', 'cP'),
('millipascal second', 'mPa·s'),
('millinewton per meter', 'mN/m'),
('microsiemens per cm', 'µS/cm'),
('millisiemens per cm', 'mS/cm'),
('milligram per minute', 'mg/min'),
('percent per minute', '%/min'),
('microliter', 'µL'),
('milliliter', 'mL'),
('liter', 'L'),
('milligram', 'mg'),
('gram', 'gram'),
('newton', 'N'),
('micronewton', 'µN'),
('millibar', 'mbar'),
('pascal', 'Pa'),
('kilopascal', 'kPa'),
('rpm (rotations per minute)', 'rpm'),
('rps (rotations per second)', 'rps'),
('watt', 'W'),
('micrometer per second', 'µm/s'),
('micrometer per minute', 'µm/min'),
('milligram per cubic centimeter', 'mg/cm³'),
('gram per cubic centimeter', 'g/cm³'),
('volt per centimeter', 'V/cm'),
('kilovolt per centimeter', 'kV/cm'),
('kilovolt per meter', 'kV/m'),
('meter per second', 'm/s'),
('mole per liter', 'mol/L'),
('degree', '°'),
('counts per second', 'cps'),
('gauge', 'G'),
('inch', 'in'),
('dalton', 'Da'),
('megadalton', 'MDa'),
('volume to volume ratio', 'v/v'),
('atomic mass unit', 'amu'),
('milligram per square centimeter per hour', 'mg/cm²/hr'),
('milligram per square centimeter per minute', 'mg/cm²/min')
ON DUPLICATE KEY UPDATE unit_name = VALUES(unit_name);


INSERT INTO polymer (polymer_name, full_name, cas_number, abbreviation) VALUES
('PCL', 'Polycaprolactone', '', 'PCL'),
('PLA', 'Polylactic Acid', '', 'PLA'),
('PVP', 'Polyvinylpyrrolidone', '', 'PVP'),
('PAN', 'Polyacrylonitrile', '', 'PAN'),
('PEO', 'Polyethylene Oxide', '', 'PEO'),
('PU', 'Polyurethane', '', 'PU'),
('PS', 'Polystyrene', '', 'PS'),
('PVDF', 'Polyvinylidene Fluoride', '', 'PVDF'),
('PEG', 'Polyethylene Glycol', '', 'PEG'),
('PMMA', 'Polymethyl Methacrylate', '', 'PMMA'),
('PVA', 'Polyvinyl Alcohol', '', 'PVA'),
('CS', 'Chitosan', '', 'CS'),
('GELATIN', 'Gelatin', '', 'GELATIN'),
('PANI', 'Polyaniline', '', 'PANI'),
('PVAC', 'Polyvinyl Acetate', '', 'PVAC'),
('PAA', 'Polyacrylic Acid', '', 'PAA'),
('PHEMA', 'Poly(2-hydroxyethyl methacrylate)', '', 'PHEMA'),
('PES', 'Polyethersulfone', '', 'PES'),
('PBT', 'Polybutylene Terephthalate', '', 'PBT'),
('PBI', 'Polybenzimidazole', '', 'PBI'),
('PAAC', 'Polyacrylic Acid', '', 'PAAC'),
('PPSU', 'Polyphenylsulfone', '', 'PPSU'),
('PCT', 'Polycyclohexylenedimethylene Terephthalate', '', 'PCT'),
('PUA', 'Polyurethane Acrylate', '', 'PUA'),
('SIO2', 'Silicon Dioxide', '', 'SIO2'),
('AU', 'Gold Nanoparticles', '', 'AU'),
('VITAMIN_E', 'Tocopherol', '', 'VITAMIN_E'),
('CURCUMIN', 'Curcumin', '', 'CURCUMIN'),
('BETA_CD', 'Beta-Cyclodextrin', '', 'BETA_CD'),
('PVC', 'Polyvinyl Chloride', '', 'PVC'),
('PLGA', 'Poly(lactic-co-glycolic acid)', '', 'PLGA'),
('GRAPHENE', 'Graphene', '', 'GRAPHENE'),
('NYLON', 'Nylon', '', 'NYLON'),
('TIO2', 'Titanium Dioxide', '', 'TIO2'),
('HPC', 'Hydroxypropyl Cellulose', '', 'HPC'),
('EC', 'Ethyl Cellulose', '', 'EC'),
('PROPOLIS', 'Propolis Extract', '', 'PROPOLIS'),
('AGNO3', 'Silver Nitrate', '', 'AGNO3'),
('TPU', 'Thermoplastic Polyurethane', '', 'TPU'),
('SILK', 'Silk Fibroin', '', 'SILK'),
('COLLAGEN', 'Collagen', '', 'COLLAGEN'),
('HA', 'Hyaluronic Acid', '', 'HA'),
('EUDRAGIT', 'Eudragit', '', 'EUDRAGIT'),
('PET', 'Polyethylene Terephthalate', '', 'PET'),
('PDLLA', 'Poly(D,L-lactic acid)', '', 'PDLLA'),
('ZEIN', 'Zein Protein', '', 'ZEIN'),
('ALG', 'Sodium Alginate', '', 'ALG'),
('PSF', 'Polysulfone', '', 'PSF'),
('PPL', 'Poly(propylene)', '', 'PPL'),
('KEFIRAN', 'Kefiran Polysaccharide', '', 'KEFIRAN'),
('AG', 'Agarose', '', 'AG'),
('CIN', 'Cinnamaldehyde', '', 'CIN'),
('PAM14', 'Polyacrylamide (14 kDa)', '', 'PAM14'),
('HP_BETA_CD', 'Hydroxypropyl Beta-Cyclodextrin', '', 'HP_BETA_CD'),
('IBS', 'Irritable Bowel Syndrome Polymer', '', 'IBS'),
('CH', 'Chitosan (alternate)', '', 'CH'),
('Y_PGA', 'Poly(gamma-glutamic acid)', '', 'Y_PGA'),
('CA', 'Cellulose Acetate', '', 'CA'),
('CUR', 'Curcumin (alternate)', '', 'CUR'),
('KNN', 'Potassium Sodium Niobate', '', 'KNN'),
('KB', 'Potassium Borate', '', 'KB'),
('P407', 'Poloxamer 407', '', 'P407'),
('SF', 'Silk Fibroin (alternate)', '', 'SF'),
('PPCL', 'Polypropylene Carbonate Lactone', '', 'PPCL'),
('SA', 'Sodium Alginate (alternate)', '', 'SA'),
('VITAMIN_A', 'Retinol (Vitamin A)', '', 'VITAMIN_A'),
('SILK_FIBROIN', 'Silk Fibroin', '', 'SILK_FIBROIN'),
('ALLICIN', 'Allicin', '', 'ALLICIN'),
('NAP', 'Naproxen', '', 'NAP'),
('PGA', 'Polyglycolic Acid', '', 'PGA'),
('PA6', 'Polyamide 6', '', 'PA6'),
('AROMATIC_PI', 'Aromatic Polyimide', '', 'AROMATIC_PI'),
('PEO_4000', 'Polyethylene Oxide (4000 MW)', '', 'PEO_4000'),
('PEO_600', 'Polyethylene Oxide (600 MW)', '', 'PEO_600'),
('NYLON_6.6', 'Nylon 6,6', '', 'NYLON_6.6'),
('NYLON_6', 'Nylon 6', '', 'NYLON_6'),
('PSA', 'Polysuccinamic Acid', '', 'PSA'),
('PHPV', 'Poly(hydroxypropyl vinyl ether)', '', 'PHPV'),
('DCF', 'Diclofenac', '', 'DCF')
ON DUPLICATE KEY UPDATE
    full_name = VALUES(full_name),
    cas_number = VALUES(cas_number),
    abbreviation = VALUES(abbreviation);

INSERT INTO solvent (solvent_name, full_name, cas_number, abbreviation) VALUES
('DSM', 'DSM', '', 'DSM'),
('BENZYL_ALCOHOL', 'BENZYL_ALCOHOL', '', 'BENZYL_ALCOHOL'),
('FA', 'FA', '', 'FA'),
('DEIONIZED_WATER', 'DEIONIZED_WATER', '', 'DEIONIZED_WATER'),
('ACETON', 'ACETON', '', 'ACETON'),
('ACETIC_ACID', 'ACETIC_ACID', '', 'ACETIC_ACID'),
('METHANOL', 'METHANOL', '', 'METHANOL'),
('DISTILLED_WATER', 'DISTILLED_WATER', '', 'DISTILLED_WATER'),
('TFH', 'TFH', '', 'TFH'),
('NMP', 'NMP', '', 'NMP'),
('WATER', 'WATER', '', 'WATER'),
('ETHANOL', 'ETHANOL', '', 'ETHANOL'),
('DMS0', 'DMS0', '', 'DMS0'),
('DMSO', 'DMSO', '', 'DMSO'),
('CHI', 'CHI', '', 'CHI'),
('HFP', 'HFP', '', 'HFP'),
('GLACIAL_WATER', 'GLACIAL_WATER', '', 'GLACIAL_WATER'),
('TFE', 'TFE', '', 'TFE'),
('DMF', 'DMF', '', 'DMF'),
('ANHYDROUS_ETHANOL', 'ANHYDROUS_ETHANOL', '', 'ANHYDROUS_ETHANOL'),
('ACETONE', 'ACETONE', '', 'ACETONE'),
('ISPOH', 'ISPOH', '', 'ISPOH'),
('HFIP', 'HFIP', '', 'HFIP'),
('DMAC', 'DMAC', '', 'DMAC'),
('FORMIC_ACID', 'FORMIC_ACID', '', 'FORMIC_ACID'),
('AC', 'AC', '', 'AC'),
('THF', 'THF', '', 'THF'),
('CHL', 'CHL', '', 'CHL'),
('DMA', 'DMA', '', 'DMA'),
('DW', 'DW', '', 'DW'),
('DCE', 'DCE', '', 'DCE'),
('DCM', 'DCM', '', 'DCM'),
('MC', 'MC', '', 'MC'),
('CHLOROFORM', 'CHLOROFORM', '', 'CHLOROFORM'),
('DX', 'DX', '', 'DX'),
('TFA', 'TFA', '', 'TFA'),
('TEBAC_SALT', 'TEBAC_SALT', '', 'TEBAC_SALT'),
('GLACIAL_ACETIC_ACID', 'GLACIAL_ACETIC_ACID', '', 'GLACIAL_ACETIC_ACID')
ON DUPLICATE KEY UPDATE
full_name = VALUES(full_name),
cas_number = VALUES(cas_number),
abbreviation = VALUES(abbreviation);


INSERT INTO morphology (category, label, abbreviation) VALUES
-- Structure
('Structure', 'Porous', 'P'),
('Structure', 'Granular', 'GR'),
('Structure', 'Droplet', 'DR'),
('Structure', 'Nano-pillar', 'NP'),

-- Topography
('Topography', 'Random', 'RD'),
('Topography', 'Aligned', 'AL'),
('Topography', 'Networked', 'NE'),

-- Texture
('Texture', 'Smooth', 'SM'),
('Texture', 'Rough', 'RF'),

-- Shape
('Shape', 'Cylinder', 'CY'),
('Shape', 'Ribbon', 'RI'),
('Shape', 'Hollow', 'HO'),
('Shape', 'Double Hollow', '2HO'),
('Shape', 'Helical', 'HE'),
('Shape', 'Sphere', 'SPH'),

-- Composition
('Composition', 'Nano-particle', 'NP'),
('Composition', 'Nano-rod', 'NR'),
('Composition', 'Core-sheath', 'BI_CSH'),
('Composition', 'Side-by-side', 'BI_SS'),
('Composition', 'Pie-wedge', 'BI_PW'),
('Composition', 'Island-in-a-sea', 'BI_IS'),

-- Defects
('Defects', 'Bead', 'BD'),
('Defects', 'Fracture', 'FR'),
('Defects', 'Fusion', 'FU'),
('Defects', 'Wrinkle', 'WR'),
('Defects', 'Interconnectivity', 'IC'),
('Defects', 'Non-uniform', 'NUN'),
('Defects', 'uneven-distribution', 'UND'),
('Defects', 'Contamination', 'CONT')
ON DUPLICATE KEY UPDATE
    category = VALUES(category),
    label = VALUES(label);
