import { DataTypes } from 'sequelize';

export default (sequelize) => {
    const Questionnaire = sequelize.define('Questionnaire', {
        employed: DataTypes.BOOLEAN,
        numberOfAnimals: DataTypes.INTEGER,
        adoptionReasons: DataTypes.STRING,
        whoWillSupport: DataTypes.STRING,
        numAdults: DataTypes.INTEGER,
        numChildren: DataTypes.INTEGER,
        childrenAges: {
            type: DataTypes.STRING,
            get() {
                const raw = this.getDataValue('childrenAges');
                return raw ? JSON.parse(raw) : [];
            },
            set(value) {
                this.setDataValue('childrenAges', JSON.stringify(value));
            }
        },
        residenceType: DataTypes.STRING,
        landlordAllows: DataTypes.BOOLEAN,
        everyoneAgrees: DataTypes.BOOLEAN,
        responsiblePerson: DataTypes.STRING,
        responsibleAgrees: DataTypes.BOOLEAN,
        allergiesOrDislikes: DataTypes.BOOLEAN,
        estimatedMonthlyCost: DataTypes.INTEGER,
        budgetAvailable: DataTypes.BOOLEAN,
        foodType: DataTypes.STRING,
        animalLocation: DataTypes.STRING,
        stayPattern: DataTypes.STRING,
        confinementType: DataTypes.STRING,
        hasToys: DataTypes.BOOLEAN,
        hasShelter: DataTypes.BOOLEAN,
        walksWithCompany: DataTypes.BOOLEAN,
        walksAlone: DataTypes.BOOLEAN,
        otherAnimalCompanion: DataTypes.BOOLEAN,
        humanCompanion24h: DataTypes.BOOLEAN,
        humanCompanionPartTime: DataTypes.BOOLEAN,
        noHumanCompanion: DataTypes.BOOLEAN,
        noAnimalCompanion: DataTypes.BOOLEAN,
        whatIfTravel: DataTypes.STRING,
        whatIfEscape: DataTypes.STRING,
        whatIfCannotKeep: DataTypes.STRING,
        pastAnimals: DataTypes.STRING,
        pastAnimalDestinations: DataTypes.STRING,
        usuallyNeuter: DataTypes.BOOLEAN,
        usuallyVaccinate: DataTypes.BOOLEAN,
        usuallyDeworm: DataTypes.BOOLEAN,
        usualVet: DataTypes.STRING,
        trainingMethod: DataTypes.STRING,
        sendsPhotosAndVideos: DataTypes.BOOLEAN,
        allowsVisits: DataTypes.BOOLEAN,
        joinsAdoptersGroup: DataTypes.BOOLEAN,
        agreesWithAdoptionFee: DataTypes.BOOLEAN,
        pickupDate: DataTypes.STRING
    }, {
        tableName: 'questionnaires',
        timestamps: true
    });

    return Questionnaire;
};