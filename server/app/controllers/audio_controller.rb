class AudioController < ApplicationController
    def info
       @name=params[:id]
       
       @data = {
           id: @name
       }
       
       render :json => @data
    end
end
