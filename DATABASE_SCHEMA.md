# Database Schema:

  Businesses :

      username: string, required

      password: string, required

      name(business name): string, required

      address: string

      phone: string

      website: string

      email: string

  Items :

      item(item name): string, required

      price: number, required

      desc(ription): string

      amt(amount of same items in iventory): number, required

      img(web address of image): string

      dates(indicates dates item -not- available): array of Javascript Date Objects

      businessId: ObjectId of business the item belongs too, required

  Messages :

      name(of customer): string, required
      
      email: string
      
      phone: string

      dates(items will be checked out): array of Javascript Dates Objects
      
      items: array of Items ObjectIds
      
      businessId: ObjectId of business message being sent to, required