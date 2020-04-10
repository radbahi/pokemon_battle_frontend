//pokemon for battle
class Pokemon{
    constructor(name, front_sprite, back_sprite, types){
        this.health = 50
        this.fainted = false
        this.name = name.charAt(0).toUpperCase() + name.slice(1)
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
    //pokemon heals by amount. maximum 50
    heal(amount){
        if(this.health + amount > 50){
            this.health = 50
        }
        else{
            this.health = this.health + amount
        }
    }

}