//pokemon for battle
class Pokemon{
    constructor(name, front_sprite, back_sprite, types){
        this.health = 100
        this.fainted = false
        this.name = name
        this.front_sprite = front_sprite
        this.back_sprite = back_sprite
        this.types = types
        this.moves = types.map(type => {
            return type.moves
        })
    }
    //pokemon takes damage by amount. if health reaches zero, pokemon faints
    takeDamage(amount){
        if(this.health > amount){
            this.health = this.health - amount
        }
        else{
            this.health = 0
            this.fainted = true
        }
    }
    //pokemon heals by amount. maximum 100
    heal(amount){
        if(this.health + amount > 100){
            this.health = 100
        }
        else{
            this.health = this.health + amount
        }
    }

}