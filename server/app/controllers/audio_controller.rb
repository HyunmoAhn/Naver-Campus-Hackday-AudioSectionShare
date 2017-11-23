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
    
end
