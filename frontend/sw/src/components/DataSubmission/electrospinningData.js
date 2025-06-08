// electrospinningData.js
const initialRows = [
    {
        id: 1,
        polymerProperty: {
            polymerComponents: [],
        },
        solventProperty: {
            solventComponents: [],
        },
        solutionProperty: null,
        collectorProperty: {
            collectorType: null,
            height: null,
            heightUnit: "cm",
            width: null,
            widthUnit: "cm",
            material: null,
            rotationSpeed: null,
            rotationSpeedUnit: "rpm",
        },
        needleProperty: {},
        processParameter: {
            voltage: null,
            voltageUnit: "kV",
            flowRate: null,
            flowRateUnit: "ml/h",
            tipCollectorDistance: null,
            tipCollectorDistanceUnit: "cm",
            spinningDuration: null,
            spinningDurationUnit: "min",
        },
        fiberProperty: {
            fiberDiameter: null,
            fiberDiameterUnit: "nm",
            fiberDiameterVariation: null,
            fiberDiameterVariationUnit: "nm",
            "isFormationStable": null,
            "productWeight": null,
            "productWeightUnit": "ug",
            fiberMorphology: [],
        },
        ambientParameter: {
            temperature: null,
            temperatureUnit: "°C",
            humidity: null,
            humidityUnit: "%",
        },
    },
];

export default initialRows;
