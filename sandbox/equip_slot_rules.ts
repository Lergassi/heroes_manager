namespace TestEquipSlotRules {
    class TestEquipSlot {
        _id: number;
        _name: string;
        _rules;

        constructor(id: number, name: string) {
            this._id = id;
            this._name = name;
        }
    }

    class TestHero {
        _id;
        _level;
        _slots;
    }

    class AbstractTestEquipSlotRule {

    }

    class EquipSlotRuleOneCategory extends AbstractTestEquipSlotRule {
        _equipSlot;
        _itemCategories;
    }

    class EquipSlotRuleForHeroClass extends AbstractTestEquipSlotRule {
        _equipSlot;
        _heroClass;
        _itemCategories;
    }

    let id = 1;
    let equipSlots = {
        'head': new TestEquipSlot(id++, 'Голова'),              //Только шлемы.
        'chest': new TestEquipSlot(id++, 'Грудь'),              //Только нагрудники.
        'right_hand': new TestEquipSlot(id++, 'Правая рука'),   //Зависит от класса. У каждого класса может быть больше 1ой категории для слота.
        'left_hand': new TestEquipSlot(id++, 'Левая рука'),     //--//-- У танков: щиты. Двуручное оружие занимает оба слота.
    };
}