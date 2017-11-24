class AudioController < ApplicationController
    def info_share
        @share_audio = Share.find(params[:share_id])
        @main_audio = Main.find(@share_audio.main_id)
        @data = {
            title: @main_audio.title,
            info: @main_audio.info,
            src: @main_audio.audio_url,
            count: @main_audio.count,
            content: @share_audio.content
        }
        render :json => @data
    end
    
    def info_list
        @main_audio = Main.find(params[:audio_id])
        @data = {
            title: @main_audio.title,
            info: @main_audio.info,
            src: @main_audio.audio_url,
            count: @main_audio.count
        }
        render :json => @data
    end
    
    def share
	    share_audio = Share.new
	    share_audio.main_id = params[:id]
	    share_audio.content = params[:content]
	    share_audio.start_time = params[:startTime]
	    share_audio.end_time = params[:endTime]
	    share_audio.save
	    add = Main.find(params[:id])
	    add.count = add.count + 1
	    add.save 

	@data = {
		id: share_audio.id
	}
	render :json => @data
    end
   
    def list
    	all_audio = Main.all
    	@data = []
    	all_audio.each do |list|
    	@data << {
    		id: list.id,
    		title: list.title,
    		count: list.count
    	}
    	end
    	render :json => @data
    end
end
