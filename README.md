# Setup

1. `git clone https://github.com/lantos14/chempare-server.git`
2. run `npm i` in folder
3. set environment variables
    * create a file with the name `.env` in root folder
    * in `.env` file, type: 
      ```
      CHEMICALIZE_TOKEN='{---Put your chemicalize token here---}'
      PORT=3030
      ```
    * you can acquire chemicalize API token [here](https://pro.chemicalize.com/) after registration
4. `npm run dev`
5. Don't forget to set up the [chemPare webapp](https://github.com/lantos14/chempare-front) as well: 
5. Enjoy :smile:

Also, you can type `npm run build` to make a production build into the `build` folder.
