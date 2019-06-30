class Api::MessagesController < ApplicationController
  def index
    @group = Group.find(params[:group_id])
    respond_to do |format|
      format.html 
      format.json  { @messages = @group.messages.where('id > ?', params[:last_message_id])}
    end
  end
end