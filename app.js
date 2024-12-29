function app() {
  return {
    launches: [],
    favorites: [],
    init(){
        setTimeout(() => {
            this.getLauncher();
        }, 1000);   
        this.getFavorites();   
    },
    async getLauncher() {
        this.launches = await fetch('https://api.spacexdata.com/v3/launches')
        .then(response => response.json())  
        .then(data => {
            data = data.slice(0, 30);
            // console.log(data);
            return data;
        })
      },
      getFavorites() {
        const storageFavorites = localStorage.getItem('favorites') ?? '[]';
        this.favorites = JSON.parse(storageFavorites);
        console.log(storageFavorites);
        
      },
      addFavorite(key) {
        this.existFavorite(key) ? this.removeFavorite(key) : this.favorites.push({id: key});               
        this.saveFavorites();
      },
      existFavorite(key) {
        return this.favorites.some(favorite => favorite.id === key);
      },
      saveFavorites() {
        localStorage.setItem('favorites', JSON.stringify(this.favorites));
      },
      removeFavorite(key) {
        this.favorites = this.favorites.filter(element => element.id !== key);
        this.saveFavorites();
      }, 
      removeAllFavorite(){
        this.favorites = [];
        this.saveFavorites();
      }

  }
}